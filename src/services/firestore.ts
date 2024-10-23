import { deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

import { db } from './firebase-config'

export const saveArray = async (email: string, arrayData: any[]) => {
  try {
    const docRef = doc(db, 'users', email)
    await setDoc(docRef, { data: arrayData }, { merge: true })
  } catch (error) {
    console.error('Erro ao salvar array: ', error)
  }
}

export const fetchArray = async (email: string) => {
  try {
    const docRef = doc(db, 'users', email)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data()?.data || []
    } else {
      console.log('Nenhum dado encontrado para este email.')
      return []
    }
  } catch (error) {
    console.error('Erro ao buscar array: ', error)
    return []
  }
}

export const editArray = async (email: string, newArrayData: any[]) => {
  try {
    const docRef = doc(db, 'users', email)
    await updateDoc(docRef, { data: newArrayData })
  } catch (error) {
    console.error('Erro ao editar array: ', error)
  }
}

export const deleteArray = async (email: string) => {
  try {
    const docRef = doc(db, 'users', email)
    await deleteDoc(docRef)
  } catch (error) {
    console.error('Erro ao deletar array: ', error)
  }
}
