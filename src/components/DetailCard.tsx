import { FC } from "react";
import { Card, Button, Skeleton } from "@mui/material";
import { useParams, useNavigate } from "react-router";
import { useService } from "../utils/Request";

interface ITodo {
  title: string;
  content: string;
}

export const DetailCard: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useService<ITodo>({
    queryKey: ["list", { id: id }],
    queryFn: () =>
      fetch(`http://localhost:5500/list/${id}`).then((res) => res.json()),
  });

  return (
    <Card
      sx={{
        padding: "1rem",
        margin: "1rem",
      }}
      variant="outlined"
      title="Title"
    >
      {isLoading ? (
        <Skeleton
          variant="text"
          sx={{ fontSize: "1rem", width: "5rem", marginBottom: "1rem" }}
        />
      ) : (
        <h3>{data?.title}</h3>
      )}
      {isLoading ? (
        <Skeleton variant="rectangular" width="100%" height={60} />
      ) : (
        <p>{data?.content}</p>
      )}
      <Button onClick={() => navigate(-1)}>Back</Button>
    </Card>
  );
};
