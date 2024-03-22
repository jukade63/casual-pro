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
    user?: User;
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

  interface Job {
    id: number;
    completed: boolean;
    isFavorite: boolean;
    jobPost: JobPost;
    ratings?: Rating[];
  }

  interface JobPost {
    id?: number;
    title: string;
    description: string;
    requirements: string[];
    location: string[];
    createdAt?: Date | null;
    startDate: string;
    endDate: string;
    jobType: string;
    paymentAmount: number;
    category: string;
    available?: boolean;
    status?: string;
    business?: Business;
    applications?: Application[];
    job?: Job;
  }

  interface Application {
    id: number;
    worker?: Worker;
    status: string;
    appliedAt: string;
    business?: Business;
    jobPost: JobPost;
  }

  interface Education {
    id?: number;
    institution: string;
    degree: string;
    major: string;
    gradDate: string;
    worker?: Worker;
  }

  interface Experience {
    id?: number;
    position: string;
    description: string;
    company: string;
    startDate: Date;
    endDate: Date;
    worker?: Worker;
  }
  interface Skill {
    id?: number;
    skillName: string;
    skillLevel?: string | null;
    certification?: string | null;
    certLink?: Url | null;
    worker?: Worker;
  }

  interface INotification {
    id: number;
    message: string;
    read: boolean;
    craeatedAt: Date;
  }


}
