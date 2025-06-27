import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'lrn_master_list' })
export class Employee {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'EmployeeID' })
  employeeID!: string;

  @Column({ name: 'LastName' })
  lastName!: string;

  @Column({ name: 'FirstName' })
  firstName!: string;

  @Column({ name: 'MiddleName', nullable: true })
  middleName!: string;

  @Column({ type: 'date', name: 'Birthday', nullable: true })
  birthday!: Date;

  @Column({ name: 'Gender', nullable: true })
  gender!: string;

  @Column({ name: 'Company', nullable: true })
  company!: string;

  @Column({ name: 'Location', nullable: true })
  location?: string;

  @Column({ type: 'date', name: 'DateHired', nullable: true })
  dateHired?: Date;

  @Column({ type: 'int', name: 'TotalYearDays', nullable: true })
  totalYearDays?: number;

  @Column({ name: 'RateType', nullable: true })
  rateType?: string;

  @Column({ type: 'decimal', precision: 18, scale: 2, name: 'Rate', nullable: true })
  rate?: number;

  @Column({ name: 'PayrollSchedule', nullable: true })
  payrollSchedule?: string;

  @Column({ name: 'SSSMode', nullable: true })
  sssMode?: string;

  @Column({ name: 'HDMFMode', nullable: true })
  hdmfMode?: string;

  @Column({ name: 'PHICMode', nullable: true })
  phicMode?: string;

  @Column({ name: 'WHTAXMode', nullable: true })
  whtaxMode?: string;

  @Column({ name: 'SSSFrequency', nullable: true })
  sssFrequency?: string;

  @Column({ name: 'HDMFFrequency', nullable: true })
  hdmfFrequency?: string;

  @Column({ name: 'PHICFrequency', nullable: true })
  phicFrequency?: string;

  @Column({ name: 'WHTaxFrequency', nullable: true })
  whtaxFrequency?: string;

  @Column({ type: 'int', name: 'NoHours', nullable: true })
  noHours?: number;

  @Column({ name: 'RoleProfile', nullable: true })
  roleProfile?: string;

  @Column({ type: 'int', name: 'JobLevel', nullable: true })
  jobLevel?: number;

  @Column({ type: 'bit', name: 'IsPWD', nullable: true })
  isPWD?: boolean;

  @Column({ type: 'bit', name: 'IsAssistantManager', nullable: true })
  isAssistantManager?: boolean;

  @Column({ type: 'bit', name: 'IsActive', nullable: true })
  isActive?: boolean;

  @Column({ name: 'PositionTitle', nullable: true })
  positionTitle?: string;

  @Column({ name: 'Department', nullable: true })
  department?: string;

  @Column({ name: 'ReportsTo', nullable: true })
  reportsTo?: string;

  @Column({ name: 'Section', nullable: true })
  section?: string;

  @Column({ name: 'SubDepartment', nullable: true })
  subDepartment?: string;

  @Column({ name: 'Classification', nullable: true })
  classification?: string;

  @Column({ name: 'PeriodGroup', nullable: true })
  periodGroup?: string;

  @Column({ name: 'SSSNumber', nullable: true })
  sssNumber?: string;

  @Column({ name: 'PHICNumber', nullable: true })
  phicNumber?: string;

  @Column({ name: 'HDMFNumber', nullable: true })
  hdmfNumber?: string;

  @Column({ name: 'TIN', nullable: true })
  tin?: string;

  @Column({ type: 'int', name: 'SensitivityLevel', nullable: true })
  sensitivityLevel?: number;

  @Column({ name: 'AttendanceBase', nullable: true })
  attendanceBase?: string;

  @Column({ type: 'bit', name: 'IgnoreUndertime', nullable: true })
  ignoreUndertime?: boolean;

  @Column({ type: 'bit', name: 'IgnoreLate', nullable: true })
  ignoreLate?: boolean;

  @Column({ type: 'bit', name: 'IgnoreNightdiff', nullable: true })
  ignoreNightdiff?: boolean;

  @Column({ type: 'int', name: 'GracePeriod', nullable: true })
  gracePeriod?: number;

  @Column({ type: 'int', name: 'LeaveApproverLevel', nullable: true })
  leaveApproverLevel?: number;

  @Column({ type: 'int', name: 'OfficialBusinessApproverLevel', nullable: true })
  officialBusinessApproverLevel?: number;

  @Column({ type: 'int', name: 'CTOApproverLevel', nullable: true })
  ctoApproverLevel?: number;

  @Column({ type: 'int', name: 'OvertimeApproverLevel', nullable: true })
  overtimeApproverLevel?: number;

  @Column({ type: 'int', name: 'ChangeScheduleApproverLevel', nullable: true })
  changeScheduleApproverLevel?: number;

  @Column({ type: 'int', name: 'DTRProblemApproverLevel', nullable: true })
  dtrProblemApproverLevel?: number;

  @Column({ type: 'bit', name: 'IsSoloParent', nullable: true })
  isSoloParent?: boolean;

  @Column({ name: 'CivilStatus', nullable: true })
  civilStatus?: string;

  @Column({ name: 'Spouse', nullable: true })
  spouse?: string;

  @Column({ name: 'BiometricsID', nullable: true })
  biometricsID?: string;

  @Column({ name: 'EmploymentStatus', nullable: true })
  employmentStatus?: string;

  @Column({ name: 'Nationality', nullable: true })
  nationality?: string;

  @Column({ name: 'Email', nullable: true })
  email?: string;

  @Column({ type: 'int', name: 'SaturdayOffEntitlement', nullable: true })
  saturdayOffEntitlement?: number;

  @Column({ name: 'Shift', nullable: true })
  shift?: string;

  @Column({ name: 'CostCenter', nullable: true })
  costCenter?: string;

  @Column({ name: 'Address', nullable: true })
  address?: string;

  @Column({ name: 'ContactNumber', nullable: true })
  contactNumber?: string;

  @Column({ name: 'DefaultSchedule', nullable: true })
  defaultSchedule?: string;
}
