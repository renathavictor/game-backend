export const firebaseLooper = (snapshot) => {
  let data = []
  
  snapshot.forEach((childSnapshot) => {
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key
    })
  })
  return data
}