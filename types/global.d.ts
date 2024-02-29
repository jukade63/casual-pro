export { }

declare global {
  interface User {
    id: number;
    username: string;
    email: string;
    userType: string;
    phoneNumber: string;
    imgUrl: string;
  }

  interface Business {
    id: number;
    industry: string | null;
    description: string | null;
    user: User;
  }

  interface Worker {
    id: number;
    user: User;
    availableFrom: Date;
    availableTo: Date;
    education: Education[];
    experiences: Experience[];
    skills: Skill[];

  }

  interface JobPost {
    id?: number;
    title: string;
    description: string;
    requirements: string[];
    location: string[];
    createdAt?: string;
    startDate: string;
    endDate: string;
    jobType: string;
    paymentAmount: number;
    category: string;
    available?: boolean;
    status?: string;
    business?: Business;
    applications?: Application[];
  }

  interface Application {
    id: number;
    worker: Worker;
    jobPost: JobPost;
    status: string;
    createdAt: string;


  }

  interface Education {
    id?: number;
    institution: string;
    degree: string;
    major: string;
    gradDate: string;

  }

  interface Session {
    user: {
        id: number;
        username: string;
        email: string;
        userType: string;
        phoneNumber: string;
        imgUrl: string;
        publicId: string;
    };
    accessToken: string;
}

}
