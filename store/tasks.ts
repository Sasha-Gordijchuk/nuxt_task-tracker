import { Priority, type Task, type User } from '~/types/'
import { Status } from '~/types/enums/status.enum'

interface TaskStoreState {
  tasks: Task[];
}

const createDefaultState = (): TaskStoreState => ({
  tasks: [
    {
    id: 'test-1',
    title: 'test-1',
    assigned: [],
    priority: Priority.LOW,
    status: Status.TODO,
    columnPosition: 0
  },
  {
    id: 'test-2',
    title: 'test-2',
    assigned: [],
    priority: Priority.LOW,
    status: Status.TODO,
    columnPosition: 1
  },
  {
    id: 'test-3',
    title: 'test-3',
    assigned: [],
    priority: Priority.LOW,
    status: Status.TODO,
    columnPosition: 2
  },
  {
    id: 'test-4',
    title: 'test-4',
    assigned: [],
    priority: Priority.LOW,
    status: Status.TODO,
    columnPosition: 3
  },
    {
    id: 'test-5',
    title: 'test-5',
    assigned: [],
    priority: Priority.LOW,
    status: Status.PROGRESS,
    columnPosition: 0
  },
  {
    id: 'test-6',
    title: 'test-6',
    assigned: [],
    priority: Priority.LOW,
    status: Status.PROGRESS,
    columnPosition: 1
  },
  {
    id: 'test-7',
    title: 'test-7',
    assigned: [],
    priority: Priority.LOW,
    status: Status.PROGRESS,
    columnPosition: 2
  },
  {
    id: 'test-8',
    title: 'test-8',
    assigned: [],
    priority: Priority.LOW,
    status: Status.PROGRESS,
    columnPosition: 3
  },
],
});

let maxId = 0;

export const useTaskStore = defineStore('task', {
  state: (): TaskStoreState => createDefaultState(),

  getters: {
    getTaskById: (state) => (id: string): Task | undefined =>
      state.tasks.find((task) => task.id === id),

    tasksByStatus: (state) => (status: Status): Task[] =>
      state.tasks.filter((task) => task.status === status).sort((a, b) => a.columnPosition - b.columnPosition),
  },

  actions: {
    addTask(task: Omit<Task, 'id' | 'columnPosition'>) {
      const newTask: Task = {
        id: `T-${++maxId}`,
        columnPosition: this.tasksByStatus(task.status).length,
        ...task
      };

      this.tasks.push(newTask);
    },

    updateTask(taskId: string, updatedTask: Partial<Task>) {
      const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedTask };
      }
    },

    updatePosition(taskId: string, newPosition: number) {
      const task = this.getTaskById(taskId);
      if (task) task.columnPosition = newPosition;
    },

    removeTask(taskId: string) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
    },

    clearAssignedUser(userId: string) {
      this.tasks.forEach((task) => {
        task.assigned = task.assigned.filter((user) => user.id !== userId);
      });
    },

    updateUserTasks(user: User | undefined) {
      if (user) {
        this.tasks.forEach((task) => {
          task.assigned = task.assigned.map((assignedUser) => {
            if (assignedUser.id === user.id) {
              return { ...assignedUser, name: user.name, abbreviation: user.abbreviation };
            }
            return assignedUser;
          });
        });
      }
    },

    updateTasksByStatus (status: Status, updatedTasks: Task[]) {
      this.tasks.splice(
        0,
        this.tasks.length,
        ...this.tasks.filter(task => task.status !== status),
        ...updatedTasks
      );
    },

    resetState() {
      this.$reset();
    },
  },
});
