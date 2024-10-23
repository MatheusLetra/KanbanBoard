function saveData(bucketName: string, data: object) {
  try {
    localStorage.setItem(`kanban-board-${bucketName}`, JSON.stringify(data))
  } catch (error) {
    console.error('Erro ao salvar dados no localStorage:', error)
  }
}

function loadData(bucketName: string) {
  try {
    const savedData = localStorage.getItem(`kanban-board-${bucketName}`)
    return savedData || ''
  } catch (error) {
    console.error('Erro ao carregar dados do localStorage:', error)
    return ''
  }
}

export { saveData, loadData }
