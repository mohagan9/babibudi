import { API } from "@/api"
import { BudiStore } from "../BudiStore"
import {
  CreateEnvironmentVariableRequest,
  StatusEnvironmentVariableResponse,
  UpdateEnvironmentVariableRequest,
} from "@budibase/types"

export type EnvVar = {
  name: string
}

interface EnvironmentState {
  variables: EnvVar[]
  status: StatusEnvironmentVariableResponse
}

class EnvironmentStore extends BudiStore<EnvironmentState> {
  constructor() {
    super({
      variables: [],
      status: {
        encryptionKeyAvailable: false,
      },
    })
  }

  async checkStatus() {
    const status = await API.checkEnvironmentVariableStatus()
    this.update(store => {
      store.status = status
      return store
    })
  }

  async createVariable(data: CreateEnvironmentVariableRequest) {
    await API.createEnvironmentVariable(data)
    let mappedVar = { name: data.name }
    this.update(state => {
      state.variables = [mappedVar, ...state.variables]
      return state
    })
  }

  async deleteVariable(name: string) {
    await API.deleteEnvironmentVariable(name)
    this.update(state => {
      state.variables = state.variables.filter(envVar => envVar.name !== name)
      return state
    })
  }

  async updateVariable(name: string, data: UpdateEnvironmentVariableRequest) {
    await API.updateEnvironmentVariable(name, data)
  }
}

export const environment = new EnvironmentStore()
