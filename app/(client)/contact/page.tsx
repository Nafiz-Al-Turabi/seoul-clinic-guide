"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateContactMailMutation } from "@/app/store/api/othersApi";
import { toast } from "sonner";

type Country = {
  name: { common: string };
  cca2: string;
  idd?: {
    root?: string;
    suffixes?: string[];
  };
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  dob: string;
  nationality: string;
  visaStatus?: string;
  desiredVisitDate?: string;
  estimatedArrivalDate?: string;
  estimatedDepartureDate?: string;
  previousProcedures?: string;
  additionalDetails?: string;
  livesInKorea: boolean;
};

export default function Contact() {
  const [createContactMail, { isLoading }] = useCreateContactMailMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const [countries, setCountries] = useState<Country[]>([]);
  const [countryCodes, setCountryCodes] = useState<
    { code: string; label: string }[]
  >([]);
  const [livesInKorea, setLivesInKorea] = useState<"yes" | "no">("yes");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data: Country[]) => {
        const sorted = data
          .filter((c) => c.name?.common)
          .sort((a, b) => a.name.common.localeCompare(b.name.common));
        setCountries(sorted);

        const codeMap = new Map<string, string>();
        data.forEach((c) => {
          if (c.idd?.root && c.idd.suffixes) {
            c.idd.suffixes.forEach((suffix) => {
              const fullCode = `${c.idd!.root}${suffix}`;
              if (!codeMap.has(fullCode)) {
                codeMap.set(fullCode, `${c.name.common} (${fullCode})`);
              }
            });
          }
        });

        const uniqueCodes = Array.from(codeMap.entries())
          .map(([code, label]) => ({ code, label }))
          .sort((a, b) => a.label.localeCompare(b.label));
        setCountryCodes(uniqueCodes);
      });
  }, []);

  const onSubmit = async (data: FormData) => {
    const finalData = {
      ...data,
      livesInKorea: livesInKorea === "yes",
    };
    try {
      const res = await createContactMail(finalData).unwrap();
      if (res.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error("Error creating contact mail:", error);
      toast.error("Failed to create contact mail");
    }
  };

  return (
    <div className="container mx-auto min-h-screen mt-10 p-4 xl:p-0 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white shadow p-4 rounded-2xl"
      >
        <div className="col-span-12 lg:col-span-6 xl:col-span-4">
          <label className="block text-[#484949] text-base font-semibold">
            First Name*
          </label>
          <input
            {...register("firstName", { required: true })}
            placeholder="First Name"
            className="w-full py-3 px-4 border rounded-md focus:outline-none focus:border-[#68b0d4]"
          />
        </div>

        <div className="col-span-12 lg:col-span-6 xl:col-span-4">
          <label className="block text-[#484949] text-base font-semibold">
            Last Name*
          </label>
          <input
            {...register("lastName", { required: true })}
            placeholder="Last Name"
            className="w-full py-3 px-4 border rounded-md focus:outline-none focus:border-[#68b0d4]"
          />
        </div>

        <div className="col-span-12 lg:col-span-6 xl:col-span-4">
          <label className="block text-[#484949] text-base font-semibold">
            Email*
          </label>
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Enter your email"
            className="w-full py-3 px-4 border rounded-md focus:outline-none focus:border-[#68b0d4]"
          />
        </div>

        <div className="col-span-12 lg:col-span-6 xl:col-span-4">
          <label className="block text-[#484949] text-base font-semibold">
            Phone*
          </label>
          <div className="flex gap-1">
            <Controller
              control={control}
              name="countryCode"
              rules={{ required: true }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="py-6">
                    <SelectValue placeholder="Code" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {countryCodes.map((c) => (
                        <SelectItem key={c.code} value={c.code}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            <input
              {...register("phone", { required: true })}
              placeholder="Phone number"
              className="flex-1 py-3 px-4 border rounded-md focus:outline-none focus:border-[#68b0d4]"
            />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 xl:col-span-4">
          <label className="block text-[#484949] text-base font-semibold">
            Date of Birth*
          </label>
          <input
            {...register("dob", { required: true })}
            type="date"
            className="w-full py-3 px-4 border rounded-md focus:outline-none focus:border-[#68b0d4]"
          />
        </div>

        <div className="col-span-12 lg:col-span-6 xl:col-span-4">
          <label className="block text-[#484949] text-base font-semibold">
            Nationality*
          </label>
          <Controller
            control={control}
            name="nationality"
            rules={{ required: true }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full py-6">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {countries.map((c) => (
                      <SelectItem key={c.cca2} value={c.name.common}>
                        {c.name.common}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="col-span-12">
          <div className="mb-4">
            <h5 className="text-[#484949] text-base font-semibold mb-2">
              Do you live in South Korea?*
            </h5>
            <div className="flex">
              <button
                type="button"
                onClick={() => setLivesInKorea("yes")}
                className={`px-6 py-2 rounded-l-md cursor-pointer ${
                  livesInKorea === "yes"
                    ? "bg-[#68b0d4] text-white"
                    : "bg-gray-200"
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setLivesInKorea("no")}
                className={`px-6 py-2 rounded-r-md cursor-pointer ${
                  livesInKorea === "no"
                    ? "bg-[#68b0d4] text-white"
                    : "bg-gray-200"
                }`}
              >
                No
              </button>
            </div>
          </div>

          {livesInKorea === "yes" ? (
            <div className="flex gap-4">
              <div className="w-full">
                <label className="block text-[#484949] text-base font-semibold">
                  Visa Status*
                </label>
                <Controller
                  control={control}
                  name="visaStatus"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full py-6 uppercase">
                        <SelectValue placeholder="--Visa Status--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {[
                            "a",
                            "b",
                            "c",
                            "d",
                            "e",
                            "f",
                            "military",
                            "other",
                            "citizen",
                          ].map((status) => (
                            <SelectItem
                              key={status}
                              value={status}
                              className="uppercase"
                            >
                              {status}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="w-full">
                <label className="block text-[#484949] text-base font-semibold">
                  Desired visit date
                </label>
                <input
                  {...register("desiredVisitDate")}
                  type="date"
                  className="w-full py-3 px-4 border rounded-md focus:outline-none focus:border-[#68b0d4]"
                />
              </div>
            </div>
          ) : (
            <div className="flex gap-4">
              <div className="w-full">
                <label className="block text-[#484949] text-base font-semibold">
                  Estimated arrival date in South Korea*
                </label>
                <input
                  type="date"
                  {...register("estimatedArrivalDate")}
                  className="w-full py-3 px-4 border rounded-md focus:outline-none focus:border-[#68b0d4]"
                />
              </div>
              <div className="w-full">
                <label className="block text-[#484949] text-base font-semibold">
                  Estimated departure date in South Korea*
                </label>
                <input
                  type="date"
                  {...register("estimatedDepartureDate")}
                  className="w-full py-3 px-4 border rounded-md focus:outline-none focus:border-[#68b0d4]"
                />
              </div>
            </div>
          )}
        </div>
        <div className="col-span-12">
          <textarea
            {...register("previousProcedures")}
            placeholder="Previous procedures (if any)"
            className="w-full h-40 py-3 px-4 border rounded-md focus:outline-none focus:border-[#68b0d4]"
          />
        </div>

        <div className="col-span-12">
          <textarea
            {...register("additionalDetails")}
            placeholder="Additional details about your enquiry"
            className="w-full h-40 py-3 px-4 border rounded-md focus:outline-none focus:border-[#68b0d4]"
          />
        </div>

        <div className="col-span-12 w-full flex justify-end ">
          <button
            type="submit"
            className="primary-bg text-white px-6 py-3 rounded-md hover:bg-opacity-90 duration-300 cursor-pointer"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
