export interface EmployeeNominee {
    nomineeId: any | number;
    empId?: any | number;
    nomineeName?: any | string;
    relationShipName? : any | string;
    relationshipId?: any | number;
    dateOfBirth?: any| Date;
    nid?: any | string;
    birthRegNo?: any |  string;
    photoPath?: any |  string;
    isActive?: any |  boolean;
    isNominee?: any | boolean;
    nomineeOwnership?: any | number;
    relationshipOthers?: any | string;
    updateOn?: any |  Date;
    document?: any | string;
}