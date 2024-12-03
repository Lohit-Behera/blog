import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import RichTextEditor from "@/components/TextEditor";
import { toast } from "sonner";
import { fetchCreateBlog } from "@/features/blogSlice";

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(50, {
      message: "Title must be less than 50 characters.",
    }),
  content: z.string().min(2, {
    message: "content must be at least 2 characters.",
  }),
});

function CreatePage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const createPostPromise = dispatch(fetchCreateBlog(data)).unwrap();
    toast.promise(createPostPromise, {
      loading: "Creating post...",
      success: (data: any) => {
        form.reset();
        navigate(`/post/${data.data}`);
        return data.message || "Post created successfully";
      },
      error: (error) => {
        return error || error.message || "Error creating post";
      },
    });
  };
  return (
    <div className="w-[98%] md:w-[90%] mx-auto bg-accent p-4 rounded-lg my-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    className="bg-background"
                    placeholder="Title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <RichTextEditor {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default CreatePage;
