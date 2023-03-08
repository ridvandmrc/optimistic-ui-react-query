import { Button, Snackbar, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const AddCard = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);
  const [openError, setOpenError] = useState(false);
  const mutation = useMutation({
    mutationFn: ({ content, title }: { title?: string; content?: string }) => {
      const currentData = queryClient.getQueryData(["list"]) as unknown[];
      queryClient.setQueryData(
        ["list"],
        [...currentData, { id: Infinity, loading: true }]
      );
      return fetch("http://localhost:5500/list", {
        method: "POST",
        body: JSON.stringify({ title, content }),
        headers: new Headers({ "content-type": "application/json" }),
      });
    },
    onSuccess: (response) => {
      console.log("success: ", response);
      if (response.status !== 200) {
        setOpenError(true);
      }
      queryClient.invalidateQueries({ queryKey: ["list"] });
    },
    onError: () => {
      console.log("error");
    },
  });

  const queryClient = useQueryClient();

  return (
    <Stack sx={{ padding: "1rem", margin: "auto", maxWidth: "25rem" }}>
      <Snackbar
        onClose={() => setOpenError(false)}
        autoHideDuration={2000}
        open={openError}
        message="Error While adding"
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      />
      <TextField size="small" label="Title" inputRef={titleRef} />
      <TextField
        size="small"
        label="Content"
        inputRef={contentRef}
        sx={{ marginY: "1rem" }}
        multiline
        rows={4}
      />
      <Button
        variant="contained"
        size="medium"
        color="error"
        disableElevation
        sx={{ fontWeight: 700 }}
        onClick={() =>
          mutation.mutate({
            title: titleRef.current?.value,
            content: contentRef.current?.value,
          })
        }
      >
        Add to Card
      </Button>
    </Stack>
  );
};
