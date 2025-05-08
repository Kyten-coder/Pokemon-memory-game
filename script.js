document.addEventListener('DOMContentLoaded', () => {
  const gridSelect = document.getElementById('grid-size');
  const welcomeScreen = document.getElementById('welcome-screen');
  const gameBoard = document.getElementById('game-board');
  const gameContainer = document.getElementById('game-container');
  const timerElement = document.getElementById('timer');
  const winMessage = document.getElementById('win-message');

  const cardBackImage = 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/f8/5e/75/f85e755a-379c-3e26-ef82-3ca09da90c41/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.png';

  let firstCard, secondCard;
  let lockBoard = false;
  let matchedPairs = 0;
  let totalPairs = 0;
  let timer;
  let timeElapsed = 0;

  const cardImages = [
    'https://github.com/user-attachments/assets/0767c33f-134d-4f19-8b10-fbdc3dce44b3',
    'https://github.com/user-attachments/assets/d3b00993-0873-431e-aa48-e7cc618a06a3',
    'https://github.com/user-attachments/assets/783684e4-346f-4dbd-8944-eb06a53a6855',
    'https://github.com/user-attachments/assets/7d0cdde7-256e-41c8-8ac3-bfcee570a242',
    'https://github.com/user-attachments/assets/47318da4-4538-46f6-bddf-c285222f12b0',
    'https://github.com/user-attachments/assets/139cda81-017d-4d8b-8900-701e50c74e60',
    'https://github.com/user-attachments/assets/dd34cfee-e3cf-442f-90c8-0ca5b58c2d01',
    'https://github.com/user-attachments/assets/35a761b4-d65c-403f-b4f6-81c8317cb4bd',
    'https://github.com/user-attachments/assets/4fef8a71-a3ab-4a8b-981f-db7bb2b83428',
    'https://github.com/user-attachments/assets/1a8dbdce-e944-4f7c-99bf-073e6ce59674',
    'https://github.com/user-attachments/assets/68493547-500e-4f92-96d3-07bcde506380',
    'https://github.com/user-attachments/assets/e7065b65-1f75-43c0-ad97-b7fb80b8d7ec',
    'https://github.com/user-attachments/assets/39f7d3a3-9d81-433b-aab5-ec74e84be5fc',
    'https://github.com/user-attachments/assets/721e588d-7d29-4720-b277-864c186d227d',
    'https://github.com/user-attachments/assets/797daa28-7df0-48f2-807c-36bfa555ed07',
    'https://github.com/user-attachments/assets/d767c935-bac6-4dd8-b048-e941750af779',
    'https://github.com/user-attachments/assets/8895e8e4-6505-4676-9261-40bc761e1222',
    'https://github.com/user-attachments/assets/bd832d72-42c4-4b08-a9c9-db5b3afa706c',
    'https://github.com/user-attachments/assets/8a13e10b-2c2a-4b24-ac69-97f6e381926f',
    'https://github.com/user-attachments/assets/6b38e801-0f26-466c-af65-faef67ddade9',
    'https://github.com/user-attachments/assets/28d11005-fafe-44a5-a3fc-28983fadf963',
    'https://github.com/user-attachments/assets/83ddeef6-9399-40ba-a3d5-2d366aa5f04f',
    'https://github.com/user-attachments/assets/08d0cb16-459d-4e94-9dea-6942156a0f38',
    'https://github.com/user-attachments/assets/9baf893c-4e95-4b81-b21f-ad0651f9562a',
    'https://github.com/user-attachments/assets/53d69d90-bd27-49b8-bfa4-93df03a21458',
    'https://github.com/user-attachments/assets/f4ce3629-cc76-4345-ba88-905724299616',
    'https://github.com/user-attachments/assets/87652645-7076-4be7-bbba-d944d6956288',
    'https://github.com/user-attachments/assets/eec39b87-0ae6-4e7d-8084-52a5aa4e4525',
    'https://github.com/user-attachments/assets/5f37c6bb-6483-42e0-932a-d2fdba74ed66',
    'https://github.com/user-attachments/assets/fe4909f4-cf0c-4fe0-98de-83e318fce1e8',
    'https://github.com/user-attachments/assets/1bbcc7b7-88ea-442e-965c-edadd029c0ca',
    'https://github.com/user-attachments/assets/cc16d0a3-af64-4cc5-9768-f5d1f7866e28',
    'https://github.com/user-attachments/assets/3a94f6d7-a127-4cbb-b18a-9a9d82a58ea1',
    'https://github.com/user-attachments/assets/2af4b366-f0bf-4cb2-8958-6dc867fff0b8',
    'https://github.com/user-attachments/assets/829f20dd-02b4-4eb3-9913-997b1139bd63',
    'https://github.com/user-attachments/assets/f77c1363-6554-4438-aefb-67cf1878b396',
    'https://github.com/user-attachments/assets/f6f49693-3147-483b-977d-91bd2e512e1e',
    'https://github.com/user-attachments/assets/870b1d3f-3baa-4bed-86f8-aeb57e67f754',
    'https://github.com/user-attachments/assets/fab5708c-7c82-47a5-bf5e-c674885d1832',
    'https://github.com/user-attachments/assets/027af52e-64e0-4528-883e-052824c8c6e1',
    'https://github.com/user-attachments/assets/bd85f568-1afd-43cb-ba0f-1326e5b2fb92',
    'https://github.com/user-attachments/assets/c9ba097f-0c72-446e-8a30-069e741abfc9',
    'https://github.com/user-attachments/assets/76d0dc05-74dd-4d5f-9246-0b9ecc3772c5',
    'https://github.com/user-attachments/assets/42a6ab40-e2d7-4bef-b52c-1c7c76d25d58',
    'https://github.com/user-attachments/assets/00be7ceb-2f0c-468f-82ca-ba609578490e',
    'https://github.com/user-attachments/assets/8e8afe2a-f871-4d75-8ea9-bffbd409ad42',
    'https://github.com/user-attachments/assets/53a2a3f5-7462-4a18-b468-719570a8a5f4'
  ];

  document.getElementById('start-btn').addEventListener('click', () => {
    const gridSize = gridSelect.value.split('x');
    const rows = parseInt(gridSize[0]);
    const cols = parseInt(gridSize[1]);
    totalPairs = Math.floor((rows * cols) / 2);
    if ((rows * cols) % 2 !== 0) totalPairs += 1;

    startGame(rows, cols);
  });

  function startGame(rows, cols) {
    welcomeScreen.style.display = 'none';
    gameContainer.style.display = 'block
