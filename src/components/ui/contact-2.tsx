import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { AlertCard } from "./alert-card";

interface Contact2Props {
  title?: string;
  description?: string;
  lang?: "id" | "en";
}

const getContactSchema = (isEn: boolean) => z.object({
  firstname: z.string().min(1, { message: isEn ? "First name is required" : "Nama depan wajib diisi" }),
  lastname: z.string().min(1, { message: isEn ? "Last name is required" : "Nama belakang wajib diisi" }),
  email: z.string().min(1, { message: isEn ? "Email is required" : "Email wajib diisi" }).email({ message: isEn ? "Invalid email address" : "Alamat email tidak valid" }),
  subject: z.string().min(1, { message: isEn ? "Subject is required" : "Subjek wajib diisi" }),
  message: z.string().min(1, { message: isEn ? "Message is required" : "Pesan wajib diisi" }),
});

type ContactFormValues = z.infer<ReturnType<typeof getContactSchema>>;

export const Contact2 = ({
  title = "Contact Us",
  description = "We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!",
  lang = "en",
}: Contact2Props) => {
  const isEn = lang === "en";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(getContactSchema(isEn)),
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (_data: ContactFormValues) => {
    // This is where you would typically handle form submission
    setIsSubmitted(true);
  };

  return (
    <section className="py-12 lg:py-32">
      <div className="container px-4 mx-auto">
        <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
          <div className="mx-auto flex w-full max-w-sm flex-col justify-between gap-10">
            <div className="text-left">
              <h1 className="mb-2 text-5xl font-semibold lg:mb-1 lg:text-6xl text-foreground font-sqr">
                {title}
              </h1>
              <p className="text-muted-foreground">{description}</p>
            </div>
            
            <div className="w-full">
              <h3 className="mb-6 text-left text-2xl font-semibold text-foreground font-sqr">
                {isEn ? "Contact Details" : "Detail Kontak"}
              </h3>
              <ul className="flex flex-col gap-4 text-foreground">
                <li className="flex items-start gap-3">
                  <div className="flex h-6 w-6 mt-0.5 shrink-0 items-center justify-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">Phone/WA</h4>
                    <p className="text-sm">+62 817-5792-805</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-6 w-6 mt-0.5 shrink-0 items-center justify-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail" className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">Email</h4>
                    <a href="mailto:hello@tuneboss.co.id" className="text-sm underline hover:text-[#e87a1e]/80">
                      hello@tuneboss.co.id
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-6 w-6 mt-0.5 shrink-0 items-center justify-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg" alt="Google Maps" className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">{isEn ? "Address" : "Alamat"}</h4>
                    <p className="text-sm">Jl. Ringroad Timur, Plumbon, Banguntapan, Kec. Banguntapan, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55281, Indonesia</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          {isSubmitted ? (
            <div className="flex h-full min-h-[400px] w-full items-center justify-center">
              <AlertCard
                isVisible={isSubmitted}
                title={isEn ? "Message Sent!" : "Pesan Terkirim!"}
                description={isEn ? "Thank you for reaching out. We have received your message and will get back to you shortly." : "Terima kasih telah menghubungi kami. Pesan Anda telah kami terima dan akan segera kami balas."}
                buttonText={isEn ? "Send Another Message" : "Kirim Pesan Lagi"}
                onButtonClick={() => {
                  setIsSubmitted(false);
                }}
              />
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto flex w-full max-w-screen-md flex-col gap-6 rounded-lg p-10 text-card-foreground">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="firstname">{isEn ? "First Name" : "Nama Depan"} <span className="text-red-500">*</span></Label>
                  <Input type="text" id="firstname" placeholder={isEn ? "First Name" : "Nama Depan"} {...register("firstname")} />
                  {errors.firstname && <span className="text-sm text-red-500">{errors.firstname.message}</span>}
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="lastname">{isEn ? "Last Name" : "Nama Belakang"} <span className="text-red-500">*</span></Label>
                  <Input type="text" id="lastname" placeholder={isEn ? "Last Name" : "Nama Belakang"} {...register("lastname")} />
                  {errors.lastname && <span className="text-sm text-red-500">{errors.lastname.message}</span>}
                </div>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                <Input type="email" id="email" placeholder="Email" {...register("email")} />
                {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="subject">{isEn ? "Subject" : "Subjek"} <span className="text-red-500">*</span></Label>
                <Input type="text" id="subject" placeholder={isEn ? "Subject" : "Subjek"} {...register("subject")} />
                {errors.subject && <span className="text-sm text-red-500">{errors.subject.message}</span>}
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="message">{isEn ? "Message" : "Pesan"} <span className="text-red-500">*</span></Label>
                <Textarea placeholder={isEn ? "Type your message here." : "Ketik pesan Anda di sini."} id="message" {...register("message")} />
                {errors.message && <span className="text-sm text-red-500">{errors.message.message}</span>}
              </div>
              <Button type="submit" className="w-full text-lg mt-2">{isEn ? "Send Message" : "Kirim Pesan"}</Button>
            </form>
          )}
          
        </div>

        {/* Google Maps Embed */}
        <div className="mx-auto mt-20 max-w-screen-xl overflow-hidden rounded-xl border border-white/10 shadow-2xl">
          <div className="relative h-0 w-full pb-[75%] md:pb-[50%] lg:pb-[35%]">
            <iframe
              className="absolute left-0 top-0 h-full w-full"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              loading="lazy"
              src="https://maps.google.com/maps?width=600&height=400&hl=en&q=tuneboss&t=&z=15&ie=UTF8&iwloc=B&output=embed"
              title="TuneBoss Location Map"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
