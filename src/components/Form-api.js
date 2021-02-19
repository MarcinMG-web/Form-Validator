export const saveUserForm = () =>
  new Promise((f) => {
    setTimeout(f, 1000);
  }).then(() => {
    console.log('Form is saved');
  });
