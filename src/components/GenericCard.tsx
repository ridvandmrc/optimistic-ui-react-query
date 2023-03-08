import { Card, Link, Skeleton } from "@mui/material";
import { FC, ReactNode } from "react";

export const GenericCard: FC<{
  title: ReactNode;
  content: ReactNode;
  id: number;
  loading?: boolean;
}> = ({ content, title, id, loading }) => {
  return (
    <Card
      sx={{
        maxWidth: "15rem",
        padding: "1rem",
        margin: "1rem",
      }}
      variant="outlined"
      title="Title"
    >
      {loading ? (
        <Skeleton
          variant="text"
          sx={{ fontSize: "1rem", width: "5rem", marginBottom: "1rem" }}
        />
      ) : (
        <h3>{title}</h3>
      )}
      {loading ? (
        <Skeleton
          variant="text"
          sx={{
            fontSize: "1rem",
            width: "15rem",
            marginBottom: "1rem",
            height: "10rem",
          }}
        />
      ) : (
        <p
          style={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitLineClamp: 7,
            boxOrient: "vertical",
            WebkitBoxOrient: "vertical",
          }}
        >
          {content}
        </p>
      )}
      <Link href={`./list/${id}`}> Read More </Link>
    </Card>
  );
};
