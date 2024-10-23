import { deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

import { db } from './firebaseConfig'

// Função para salvar um array no Firestore
export const saveArray = async (email: string, arrayData: any[]) => {
  try {
    const docRef = doc(db, 'users', email)
    await setDoc(docRef, { data: arrayData }, { merge: true }) // merge: true para não sobrescrever outros dados
    console.log('Array salvo com sucesso!')
  } catch (error) {
    console.error('Erro ao salvar array: ', error)
  }
}

// Função para buscar um array no Firestore
export const fetchArray = async (email: string) => {
  try {
    const docRef = doc(db, 'users', email)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      console.log('Dados encontrados: ', docSnap.data())
      return docSnap.data()?.data || [] // Retorna o array ou um array vazio
    } else {
      console.log('Nenhum dado encontrado para este email.')
      return []
    }
  } catch (error) {
    console.error('Erro ao buscar array: ', error)
    return []
  }
}

// Função para editar um array no Firestore
export const editArray = async (email: string, newArrayData: any[]) => {
  try {
    const docRef = doc(db, 'users', email)
    await updateDoc(docRef, { data: newArrayData })
    console.log('Array editado com sucesso!')
  } catch (error) {
    console.error('Erro ao editar array: ', error)
  }
}

// Função para deletar um array no Firestore
export const deleteArray = async (email: string) => {
  try {
    const docRef = doc(db, 'users', email)
    await deleteDoc(docRef)
    console.log('Array deletado com sucesso!')
  } catch (error) {
    console.error('Erro ao deletar array: ', error)
  }
}
