import axiosInstance from './axiosInstance'
import { CreateTask, EditTask, Task } from '../types/task'

export const createTask = async (taskData: CreateTask): Promise<Task> => {
  try {
    const response = await axiosInstance.post('/tasks', taskData);
    return response.data[0]
  } catch (error) {
    throw error
  }
}

export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await axiosInstance.get('/tasks')
    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteTask = async (taskId: number): Promise<string> => {
  try {
    console.log('here: ', taskId)
    const response = await axiosInstance.delete(`/tasks/${taskId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const editTask = async (taskId: number, taskData: EditTask): Promise<string> => {
  try {
    const response = await axiosInstance.put(`/tasks/${taskId}`, taskData)
    return response.data
  } catch (error) {
    throw error
  }
}