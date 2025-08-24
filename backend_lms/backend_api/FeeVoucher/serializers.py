from rest_framework import serializers
from .models import FeeVoucher

class FeeVoucherSerializer(serializers.ModelSerializer):
    Student_Name = serializers.CharField(source='Student.Student_Name', read_only=True)
    Student_Reg_No = serializers.CharField(source='Student.Reg_No', read_only=True)
    Department = serializers.CharField(source='Student.Course_Category.Related_Department', read_only=True)
    Category = serializers.CharField(source='Student.Course_Category.Category_Name', read_only=True)

    class Meta:
        model = FeeVoucher
        fields = [
            "id",
            "Challan_no",
            "Student",
            "Student_Name",
            'Student_Reg_No',
            "Department",   # added
            "Category",     # added
            "Challan_Type",
            "Amount_to_Pay",
            "Fine_Date",
            "Fine_Amount",
            "Amount_Paid",
            "Amount_Date",
            "Status",
            "Bank_Branch",
        ]
