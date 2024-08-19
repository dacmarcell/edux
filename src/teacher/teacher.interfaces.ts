export interface CreateTeacher {
  name: string;
  email: string;
  password: string;
  isCoordinator: boolean;
};

export interface UpdateTeacher extends Partial<CreateTeacher> { };