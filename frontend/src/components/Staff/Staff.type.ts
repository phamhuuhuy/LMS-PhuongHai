export type Staff = {
  employeeUserName?: string;
  employeePassword?: string;
  employeeName?: string;
  employeeLab?: string;
  isManager?: boolean | string;
};

export interface IStaffFetch {
  id: string;
  employeeUserName: string;
  employeePassword: string;
  employeeName: string;
  employeeLab: string;
  isManager: string;
}