"use client";

import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

export function ComboBoxResponsive({ data }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedStatus, setSelectedStatus] = React.useState(null);
  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedStatus ? (
              <>{selectedStatus.label}</>
            ) : (
              <>
                {" "}
                Fon Seç
                {<ArrowRightIcon className="ml-auto" />}
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList
            setOpen={setOpen}
            setSelectedStatus={setSelectedStatus}
            selectedStatus={selectedStatus}
            data={data}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="w-[150px] justify-start"
          type="button"
        >
          {selectedStatus ? (
            <>{selectedStatus.label}</>
          ) : (
            <>Fon Seç {<ArrowRightIcon className="ml-auto" />}</>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList
            setOpen={setOpen}
            setSelectedStatus={setSelectedStatus}
            selectedStatus={selectedStatus}
            data={data}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function StatusList({ setOpen, setSelectedStatus, data, selectedStatus }) {
  return (
    <>
      <Command>
        <CommandInput placeholder="Filter status..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {data.map((item) => (
              //add params to the link

              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={(value) => {
                  setSelectedStatus(
                    data.find((priority) => priority.value === value) || null
                  );
                  setOpen(false);
                }}
                className="p-0"
              >
                <button
                  key={item.value}
                  className="w-full px-2 py-1.5"
                  type="submit"
                  form="fund-form"
                >
                  {item.label}
                </button>
                <input
                  type="hidden"
                  form="fund-form"
                  name="fundCode"
                  value={selectedStatus?.label}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </>
  );
}
