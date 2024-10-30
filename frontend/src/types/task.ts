 export interface Task {
    _id: string;
    title: string;
    description: string;
    dueDate: string;
    startTime: string;
    endTime: string;
    priority: "high" | "medium" | "low";
    status: "completed" | "pending";
 }
  
export interface TaskCreation{
    title: string;
    description: string;
    dueDate: string;
    startTime: string;
    endTime: string;    
}

export interface TaskUpdate{
    _id: string;
    title?: string;
    description?: string;
    status?: "completed" | "pending";

}
  
  export interface ApiError {
    response?: {
      data?: {
        message?: string
      }
    }
    message?: string
  }
  

  
  export interface BasicResponse {
    success: boolean; // Indicates if the operation was successful
    message?: string; // Optional message providing more details
  }
  

