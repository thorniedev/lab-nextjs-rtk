"use client";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Mail, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useGoogleFont } from "@/hooks/use-google-font";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Controller } from "react-hook-form";

import { Field, FieldError } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { getImageProxySrc } from "@/lib/utils";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormType = z.infer<typeof formSchema>;

type OfferModalData = {
  overline: string;
  title: string;
  description: string;
};

type Offermodal4Props = OfferModalData;

const OFFER_MODAL = {
  overline: "Treat Yourself!",
  title: "Become a Member & Enjoy 20% Off",
  description:
    "Sign up to receive our latest updates — you can unsubscribe whenever you like.",
};

const OfferModal4 = ({
  overline = OFFER_MODAL.overline,
  title = OFFER_MODAL.title,
  description = OFFER_MODAL.description,
}: Offermodal4Props) => {
  useGoogleFont("Oswald");
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: FormType) {
    console.log(values);
  }

  return (
    <Dialog defaultOpen>
      <DialogContent
        showCloseButton={false}
        style={
          {
            "--font-antonio": "Oswald, sans-serif",
          } as React.CSSProperties
        }
        className="data-[state=closed]:slide-out-to-bottom-30 data-[state=open]:slide-in-from-bottom-30 sm:max-w-190 lg:max-w-117.5 group max-h-[calc(100dvh-2rem)] max-w-full gap-0 rounded-none border-none p-0 max-lg:bottom-0 max-lg:top-auto max-lg:translate-y-0"
      >
        <div className="absolute -end-px -top-px">
          <DialogClose asChild>
            <Button
              size="icon-sm"
              className="origin-top-right rounded-none transition-all duration-300 lg:scale-50 lg:opacity-0 lg:group-hover:scale-100 lg:group-hover:opacity-100 [@media(hover:none)]:scale-100 [@media(hover:none)]:opacity-100"
            >
              <X />
            </Button>
          </DialogClose>
        </div>
        <div className="max-h-72.5 h-full overflow-hidden max-lg:hidden">
          <Image
            src={getImageProxySrc(
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/promotional/Woman-with-Smartphone-2.png",
            )}
            alt="Woman shopping on her smartphone"
            width={640}
            height={720}
            unoptimized
            className="block size-full object-cover object-[50%_15%]"
          />
        </div>
        <div className="lg:px-15 space-y-5 overflow-y-auto px-9 py-5 lg:py-7">
          <div className="space-y-2.5">
            <p className="font-antonio text-center text-sm font-bold uppercase leading-none">
              {overline}
            </p>
            <DialogTitle className="font-antonio text-center text-3xl font-bold">
              {title}
            </DialogTitle>
          </div>
          <form
            className="space-y-2.5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex items-center gap-2.5">
              <Controller
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <Field className="flex-1" data-invalid={fieldState.invalid}>
                    <InputGroup>
                      <InputGroupInput
                        placeholder="Email Address"
                        {...field}
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon align="inline-end">
                        <Mail />
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Button size="icon" type="submit" className="lg:hidden">
                <ArrowRight />
              </Button>
            </div>
            <Button className="w-full max-lg:hidden" type="submit">
              Get Offer
            </Button>
          </form>
          <DialogFooter>
            <DialogDescription className="text-muted-foreground text-center text-xs leading-relaxed">
              {description}
            </DialogDescription>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { OfferModal4 };
