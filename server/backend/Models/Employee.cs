using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Employee
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string EmployeeCode { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string? Phone { get; set; }

    public int DepartmentId { get; set; }

    public int PositionId { get; set; }

    public DateOnly? HireDate { get; set; }

    public string? Status { get; set; }

    public virtual Department Department { get; set; } = null!;

    public virtual ICollection<LeaveRequest> LeaveRequests { get; set; } = new List<LeaveRequest>();

    public virtual Position Position { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
