import { UserInfo } from '../pages/Home/Home'
import { fetchArray, saveArray } from '../services/firestore'
import { loadData } from './localstorage'

export async function updateDataOnFirestore(data: any) {
  const userInfo = await loadData('user-data')

  if (!userInfo) {
    return
  }

  const parsedUserInfo: UserInfo = JSON.parse(userInfo)

  if (!parsedUserInfo.email) {
    return
  }

  await saveArray(parsedUserInfo.email, data)
}

export async function loadDataFromFirestore() {
  const userInfo = await loadData('user-data')

  if (!userInfo) {
    return
  }

  const parsedUserInfo: UserInfo = JSON.parse(userInfo)

  if (!parsedUserInfo.email) {
    return
  }

  let result = await fetchArray(parsedUserInfo.email)

  return result
}
