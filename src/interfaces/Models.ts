export interface Ingredient { id: string; name: string }

export interface Category { id: number; name: string }

export interface Media { url_cover: string; url_video: string }

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  role: "student" | "teacher" | "admin";
}

export interface Recipe {
  id: string
  name: string
  description: string
  ingredient: Ingredient[]
  steps: string[]
}

export interface Course {
  id: number
  title: string
  description: string
  duration: string
  price: number
  category: Category
  user: User
  recipe: Recipe
  media: Media
}

export interface CourseMedia {
  id: number
  url_video: string
  url_cover: string
}

export interface Answer {
  id: string
  answer: string
  is_correct: boolean
}

export interface Question {
  id: string
  question: string
  answers: Answer[]
}

export interface Survey {
  id: string
  title: string
  description: string
  course: Course
  questions: Question[]
}