from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from datetime import datetime
from django.utils.timezone import now
from .models import FeeVoucher
from .serializers import FeeVoucherSerializer
from Account.models import Student
from Library.models import LibraryCard
from Library.models import LibraryApplication
from Hostel.models import HostelApplication
import uuid

class FeeVoucherViewSet(viewsets.ModelViewSet):
    queryset = FeeVoucher.objects.all()
    serializer_class = FeeVoucherSerializer
    def get_queryset(self):
       student_id = self.request.query_params.get("student_id")
       voucher_id = self.request.query_params.get("voucher_id")

       if voucher_id:
          return FeeVoucher.objects.filter(id=voucher_id)  # id field use karo
       if student_id:
           return FeeVoucher.objects.filter(Student_id=student_id)
       return FeeVoucher.objects.all()

    # --- Single Voucher ---
    @action(detail=False, methods=["post"])
    def generate_single(self, request):
        student_id = request.data.get("student_id")
        challan_type = request.data.get("challan_type")
        amount = request.data.get("amount")
        fine_date = request.data.get("fine_date")
        fine_amount = request.data.get("fine_amount") or 0
        bank_branch = request.data.get("bank_branch") or "Default Branch"

        if not student_id or not challan_type or not amount:
            return Response({"error": "student_id, challan_type, and amount are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            student_id = int(student_id) 
            student = Student.objects.get(id=student_id)
        except Student.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)

        voucher = FeeVoucher.objects.create(
            Student=student,
            Challan_no=str(uuid.uuid4())[:8],
            Challan_Type=challan_type,
            Amount_to_Pay=amount,
            Fine_Date=fine_date,
            Fine_Amount=fine_amount,
            Bank_Branch=bank_branch,
            Amount_Date=now().date()  # record admin issue date
        )
        return Response(FeeVoucherSerializer(voucher).data, status=status.HTTP_201_CREATED)

    # --- Bulk Voucher ---
    @action(detail=False, methods=["post"])
    def generate_bulk(self, request):
        department_id = request.data.get("department_id")
        category_id = request.data.get("category_id")
        challan_type = request.data.get("challan_type")
        amount = request.data.get("amount")
        fine_date = request.data.get("fine_date")
        fine_amount = request.data.get("fine_amount") or 0
        bank_branch = request.data.get("bank_branch") or "Default Branch"
        
        

        if not department_id or not category_id or not challan_type or not amount:
            return Response({"error": "department_id, category_id, challan_type, amount required"}, status=status.HTTP_400_BAD_REQUEST)

        students = Student.objects.filter(
            Course_Category__Related_Department_id=department_id,
            Course_Category_id=category_id
        )

        if not students.exists():
            return Response({"error": "No students found in this department & category"}, status=status.HTTP_404_NOT_FOUND)

        vouchers = []
        for student in students:
            voucher = FeeVoucher.objects.create(
                Student=student,
                Challan_no=str(uuid.uuid4())[:8],
                Challan_Type=challan_type,
                Amount_to_Pay=amount,
                Fine_Date=fine_date,
                Fine_Amount=fine_amount,
                Bank_Branch=bank_branch,
                Amount_Date=now().date()  # admin-set date
            )
            vouchers.append(voucher)

        return Response(FeeVoucherSerializer(vouchers, many=True).data, status=status.HTTP_201_CREATED)

    # --- Supply Voucher ---
    @action(detail=False, methods=['post'])
    def generate_supply(self, request):
        department_id = request.data.get("department_id")
        category_id = request.data.get("category_id")
        amount = request.data.get("amount")
        fine_date = request.data.get("fine_date")
        fine_amount = request.data.get("fine_amount") or 0
        bank_branch = request.data.get("bank_branch") or "Default Branch"

        if not department_id or not category_id or not amount:
            return Response({"error": "department_id, category_id, amount required"}, status=status.HTTP_400_BAD_REQUEST)

        students = Student.objects.filter(
            Course_Category__Related_Department_id=department_id,
            Course_Category_id=category_id
        ).exclude(Supply_Courses__isnull=True)

        if not students.exists():
            return Response({"error": "No supply students found in this department & category"}, status=status.HTTP_404_NOT_FOUND)

        vouchers = []
        for student in students:
            voucher = FeeVoucher.objects.create(
                Student=student,
                Challan_no=str(uuid.uuid4())[:8],
                Challan_Type="Supply-fee",
                Amount_to_Pay=amount,
                Fine_Date=fine_date,
                Fine_Amount=fine_amount,
                Bank_Branch=bank_branch,
                Amount_Date=now().date()  # record admin-set date
            )
            vouchers.append(voucher)

        return Response(FeeVoucherSerializer(vouchers, many=True).data, status=status.HTTP_201_CREATED)

    # --- Mark Voucher Paid ---
    @action(detail=True, methods=["post"])
    def mark_paid(self, request, pk=None):
        try:
            voucher = FeeVoucher.objects.get(pk=pk)
        except FeeVoucher.DoesNotExist:
            return Response({"error": "Voucher not found"}, status=status.HTTP_404_NOT_FOUND)

        paid_date_str = request.data.get("paid_date")  # string from React
        amount_paid = request.data.get("amount_paid")

        if not amount_paid:
            return Response({"error": "amount_paid is required"}, status=status.HTTP_400_BAD_REQUEST)

    # Convert string to date
        if paid_date_str:
            paid_date = datetime.strptime(paid_date_str, "%Y-%m-%d").date()
        else:
            paid_date = now().date()

    # Fine check
        fine_amount = 0
        if voucher.Fine_Date and paid_date > voucher.Fine_Date:
            fine_amount = voucher.Fine_Amount or 100  # default fine if not set

        total_due = float(voucher.Amount_to_Pay) + float(fine_amount)

        if float(amount_paid) < total_due:
            return Response({"error": f"Full payment required. Total due: {total_due}"}, status=status.HTTP_400_BAD_REQUEST)

        voucher.Amount_Paid = amount_paid
        voucher.Amount_Date = paid_date  # store actual payment date
        voucher.Status = "Paid"
        voucher.Fine_Amount = fine_amount
        voucher.save()
        student = voucher.Student
        student.Fee_Status = True
        student.save()
        if voucher.Challan_Type == "Library-fee":
            if not LibraryCard.objects.filter(Student=student).exists():
                LibraryCard.objects.create(
                   Student=student,
                   Card_Number=str(uuid.uuid4())[:8],  # random unique card no
                   Expiry_Date=now().date().replace(year=now().year + 1)  # 1 year validity
                )

        return Response(FeeVoucherSerializer(voucher).data, status=status.HTTP_200_OK)
    
    
    @action(detail=False, methods=["post"])
    def generate_library_fee(self, request):
       
      
        application_ids = request.data.get("application_ids")  # list of library application ids
        amount = request.data.get("amount")  # fee amount
        fine_date = request.data.get("fine_date")
        fine_amount = request.data.get("fine_amount") or 0
        bank_branch = request.data.get("bank_branch") or "Default Branch"

        if not application_ids or not amount:
            return Response({"error": "application_ids and amount are required"}, status=status.HTTP_400_BAD_REQUEST)

        applications = LibraryApplication.objects.filter(id__in=application_ids, status="Approved")
        if not applications.exists():
            return Response({"error": "No approved library applications found"}, status=status.HTTP_404_NOT_FOUND)

        vouchers = []
        generated_ids = []  # track which applications are processed

        for app in applications:
            student = app.student
        # Create FeeVoucher
            voucher = FeeVoucher.objects.create(
                Student=student,
                Challan_no=str(uuid.uuid4())[:8],
                Challan_Type="Library-fee",
                Amount_to_Pay=amount,
                Fine_Date=fine_date,
                Fine_Amount=fine_amount,
                Bank_Branch=bank_branch,
                Amount_Date=now().date()
            )
            vouchers.append(voucher)

        # Mark application as fee generated
            app.fee_generated_status = True
            app.save()
            generated_ids.append(app.id)

        return Response({
            "message": "Library fee vouchers generated successfully!",
            "generated_ids": generated_ids  # send these to React to remove from list
        }, status=201)


    @action(detail=False, methods=["post"])
    def generate_hostel_fee_yearly(self, request):
    
        amount = request.data.get("amount")  # yearly hostel fee
        fine_date = request.data.get("fine_date")
        fine_amount = request.data.get("fine_amount") or 0
        bank_branch = request.data.get("bank_branch") or "Default Branch"

        if not amount:
            return Response({"error": "amount is required"}, status=status.HTTP_400_BAD_REQUEST)

        current_year = datetime.now().year

    # Select all students with approved hostel applications
        applications = HostelApplication.objects.filter(status="Approved")

        vouchers = []
        generated_ids = []

        for app in applications:
            try:
                student = Student.objects.get(Student_Email=app.Email)
            except Student.DoesNotExist:
                continue

        # Check if voucher for current year already exists
            existing_voucher = FeeVoucher.objects.filter(
                Student=student,
                Challan_Type="Hostel-fee",
                Amount_Date__year=current_year
            ).first()
            if existing_voucher:
                continue  # skip if already generated this year

        # Create new voucher for current year
            voucher = FeeVoucher.objects.create(
                Student=student,
                Challan_no=str(uuid.uuid4())[:8],
                Challan_Type="Hostel-fee",
                Amount_to_Pay=amount,
                Fine_Date=fine_date,
                Fine_Amount=fine_amount,
                Bank_Branch=bank_branch,
                Amount_Date=datetime.now().date()
            )
            vouchers.append(voucher)
            generated_ids.append(app.id)

        return Response({
            "message": f"Hostel fee vouchers generated for year {current_year}!",
            "generated_ids": generated_ids
        }, status=201)