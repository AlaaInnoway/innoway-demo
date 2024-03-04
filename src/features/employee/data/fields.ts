export const employeeFields: any = {
  name: {
    required: true,
  },
  birthdate: {
    required: false,
  },
  jobTitle: {
    required: true,
  },
  department: {
    required: true,
  },
  parent: {
    required: false,
  },
  employmentType: {
    required: false,
  },
  email: {
    required: true,
  },
  phone: {
    required: true,
  },
  mobile: {
    required: false,
  },
  joiningDate: {
    required: false,
  },
  gender: {
    required: true,
  },
  street: {
    required: false,
  },
  zipCode: {
    required: false,
  },
  city: {
    required: false,
  },
  province: {
    required: false,
  },
  country: {
    required: false,
  },
};

export const departmentFields: any = {
  name: {
    required: true,
  },
  head: {
    required: false,
  },
  description: {
    required: false,
  },
};

export const contractFields: any = {
  name: {
    required: true,
  },
  employee: {
    required: true,
  },
  type: {
    required: true,
  },
  jobTitle: {
    required: true,
  },
  department: {
    required: true,
  },
  startDate: {
    required: true,
  },
  endDate: {
    required: false,
  },
  salaryAmount: {
    required: false,
  },
  bonuseAmount: {
    required: false,
  },
  deductionAmount: {
    required: false,
  },
};
