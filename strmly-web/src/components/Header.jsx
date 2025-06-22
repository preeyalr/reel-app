export default function Header() {
return(<button
  onClick={() => {
    localStorage.removeItem("userID");
    window.location.reload();
  }}
  className="text-sm text-red-500"
>
  Logout
</button>);
}