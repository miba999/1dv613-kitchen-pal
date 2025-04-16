import { useAuthUser } from "@/context/AuthContext";

const Dashboard = () => {
  const { user } = useAuthUser();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Hej {user?.email} 👋</h1>
      <p className="text-muted-foreground mt-2">
        Välkommen tillbaka! Gå till receptlistan för att börja planera dina måltider.
      </p>
    </div>
  );
};

export default Dashboard;