import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

const POST_CODE = new RegExp("^[0-9]{7}$");
const FormSchema = z.object({
  name: z.string({
    required_error: "名前を入力してください",
  }),
  email: z
    .string({
      required_error: "Eメールを入力してください",
    })
    .email({
      message: "Eメールの形式で入力してください",
    }),

  zip: z
    .string({
      required_error: "郵便番号を入力してください",
    })
    .regex(
      POST_CODE,
      "半角数字、ハイフンなしで入力してください（例: 1234567）"
    ),
  prefecture: z.string({
    required_error: "都道府県を入力してください",
  }),
  address1: z.string({
    required_error: "市区町村・番地を入力してください",
  }),
  address2: z.string().optional(),
});
const prefectures = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
];

export default function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    fetch("https://httpstat.us/201", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data, null, 2),
    });
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="flex justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[500px] space-y-6 justify-center items-center"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center">
                <FormLabel className="w-[150px] text-end pr-4">氏名</FormLabel>
                <div className="w-full flex-col">
                  <FormControl>
                    <Input placeholder="(例)トレタ 太郎" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center">
                <FormLabel className="w-[150px] text-end pr-4">
                  Eメール
                </FormLabel>
                <div className="w-full flex-col">
                  <FormControl>
                    <Input placeholder="(例)yoyaku@toreta.in" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zip"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center">
                <FormLabel className="w-[150px] text-end pr-4">
                  郵便番号
                </FormLabel>
                <div className="w-full flex-col">
                  <FormControl>
                    <Input placeholder="(例)0000000" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="prefecture"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center">
                <FormLabel className="w-[150px] text-end pr-4">
                  都道府県
                </FormLabel>
                <div className="w-full flex-col">
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      defaultValue={field.value as any}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="選択してください" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {prefectures.map((prefecture) => (
                          <SelectItem key={prefecture} value={prefecture}>
                            {prefecture}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address1"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center">
                <FormLabel className="w-[150px] text-end pr-4">
                  市区町村・番地
                </FormLabel>
                <div className="w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="(例)品川区西五反田７丁目２２−１７"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address2"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center">
                <FormLabel className="w-[150px] text-end pr-4">
                  建物名・号室
                </FormLabel>
                <div className="w-full flex-col">
                  <FormControl>
                    <Input placeholder="(例)TOCビル 8F" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button
              disabled={!form.formState.isDirty || !form.formState.isValid}
              type="submit"
              className=" bg-green-400 px-8"
            >
              登録
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
