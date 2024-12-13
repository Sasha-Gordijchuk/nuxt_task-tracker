import type { User } from "~/types";
import { useTaskStore } from "./tasks";

interface UserStoreState {
  users: User[];
}

const createDefaultState = (): UserStoreState => ({
  users: [
    {
      id: 'U-0',
      name: 'Default User',
      abbreviation: 'DU'
    },
  ],
});

let maxId = 0;

export const useUserStore = defineStore('user', {
  state: (): UserStoreState => createDefaultState(),

  getters: {
    getUserById: (state) => (id: string): User | undefined =>
      state.users.find((user) => user.id === id),
  },

  actions: {
    addUser(name: string) {
      const userId = `U-${++maxId}`;
      const abbreviation = this.createAbbreviation(name);
      const newUser: User = {
        id: userId,
        name,
        abbreviation
      };
      this.users.push(newUser);
    },

    updateUser(userId: string, updatedUser: Partial<User>) {
      const userIndex = this.users.findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        const updatedName = updatedUser.name || this.users[userIndex].name;

        this.users[userIndex] = {
          ...this.users[userIndex],
          ...updatedUser,
          abbreviation: this.createAbbreviation(updatedName)
        };
      }
    },

    removeUser(userId: string) {
      this.users = this.users.filter((user) => user.id !== userId);
    },

    resetState() {
      this.$reset();
    },

    createAbbreviation(name: string): string {
      const nameParts = name.split(' ');
      if (nameParts.length === 1) {
        return nameParts[0].charAt(0).toUpperCase();
      } else {
        return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
      }
    }
  },
});
