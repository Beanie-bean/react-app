import MyGamesList from "../components/MyGamesList";

function MyGames() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <h2 class="p-3 d-flex justify-content-center">My Games</h2>
      <MyGamesList />
    </div>
  )
}

export default MyGames;
