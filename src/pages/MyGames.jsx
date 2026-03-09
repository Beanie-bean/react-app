import MyGamesList from "../components/MyGamesList";

function MyGames() {
  return (
    <>
      <div class="d-flex p-3">
        <h2 class="ms-auto">My Games</h2>
        <button type="button" class="d-flex btn btn-primary ms-auto">Create List</button>
      </div>
      <MyGamesList/ >
    </>
  )
}

export default MyGames;
