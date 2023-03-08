import { Box } from "@mui/material";
import { AddCard } from "./components/AddCard";
import { GenericCard } from "./components/GenericCard";
import { useService } from "./utils/Request";

interface ITodo {
  title: string;
  content: string;
  id: number;
  loading?: boolean;
}

function App() {
  const { data } = useService<ITodo[]>({
    queryKey: ["list"],
    queryFn: (args) => {
      return fetch("http://localhost:5500/list").then((res) => res.json());
    },
  });

  return (
    <>
      <AddCard />
      <Box
        sx={{
          flexDirection: "row",
          display: "flex",
          flexWrap: "wrap",
          maxWidth: "80rem",
          margin: "auto",
        }}
      >
        {data
          ?.sort((item1, item2) => item2.id - item1.id)
          ?.map(({ content, title, id, loading }, index) => (
            <GenericCard
              loading={loading}
              key={index}
              content={content}
              title={title}
              id={id}
            />
          ))}
      </Box>
    </>
  );
}

export default App;
