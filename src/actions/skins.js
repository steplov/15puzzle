import monks from '../assets/monks.jpg';

export const SET_SKIN = 'SET_SKIN';

export const loadImage = (tileSize) => (dispatch, getState) => {
  const gridSize = getState().app.gridSize;

  const image = new Image();
  const cutImageUp = () => {
    const imagePieces = [];
    for(let x = 0; x < gridSize; ++x) {
      for(let y = 0; y < gridSize; ++y) {
          const canvas = document.createElement('canvas');

          canvas.width = tileSize;
          canvas.height = tileSize;

          const context = canvas.getContext('2d');
          context.drawImage(image, x * tileSize, y * tileSize, tileSize, tileSize, 0, 0, canvas.width, canvas.height);
          imagePieces.push(canvas.toDataURL());
      }
    }

    dispatch({
      type: SET_SKIN,
      payload: imagePieces
    })
  }

  image.onload = cutImageUp;
  image.src = monks;
}
