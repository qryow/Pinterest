export interface IUser {
  email: string;
  password: string;
  password_confirm: string;
  username: string;
}

export interface OneUser {
  uid: string,
  email: string,
  username: string,
  fullName: string,
  following: any[], // нужно сделать тип для массива
  followers: any[], //тоже самое
  profilePicURL: string,
  bio: string,
  descs: any[], //тип для доски
  pins: any[], //тип для пина
  createdAt: number,
  [key: string]: any; 
}


export interface OneComment {
  author: string;
  comment: string;
  createdAt: number;
}

export interface IPin {
  id?: string;
  name: string;
  bio: string;
  author: string;
  createdAt: number;
  img: string | undefined;
  tags: string[];
  comments: OneComment[];
}

export interface IDesc {
  id: string;
  name: string;
  bio: string;
  descPic: string;
  author: string;
  createdAt: number;
  pins: IPin[];
}