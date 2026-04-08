import AllGamesList from "../components/AllGamesList";

function AllGames() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <h2 class="p-3 d-flex justify-content-center">All Games</h2>
      <AllGamesList />
    </div>
  )
}

export default AllGames;
