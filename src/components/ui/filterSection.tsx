import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/common/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/common/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/common/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/common/popover";
import { Heading } from "@radix-ui/themes";
import {
  filterData,
  filterDataHeading,
} from "@/services/getFilterData.service";
import axios from "axios";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { setDishes, setSearched } from "@/store/dishSlice";

type FilteredMeal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

const dynamicFields = filterDataHeading.reduce((acc, heading) => {
  return {
    ...acc,
    [heading]: z.string().min(1, { message: `Please select ${heading}.` }),
  };
}, {} as Record<string, z.ZodString>);

const filterDataWithDefault = filterDataHeading.map((heading, index) => {
  return [{ label: heading, value: heading }, ...filterData[index]];
});
const FormSchema = z.object({
  ...dynamicFields,
});

const defaultValues = filterDataHeading.reduce((acc, heading) => {
  acc[heading] = heading;
  return acc;
}, {} as Record<string, string>);

function FilterSection() {
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const filters = Object.entries(data).map(([key, value]) => ({
      key: key.replace(/\s+/g, ""),
      value,
    }));

    const keyMap: string[] = ["a", "c"];

    const requests = filters.map((filter, index) => {
      return axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?${
          keyMap[index]
        }=${encodeURIComponent(filter.value)}`
      );
    });

    try {
      const results = await Promise.all(requests);

      const mealsArrays = results.map((res) => res.data.meals);

      if (mealsArrays.some((arr) => arr.length === 0)) {
        return;
      }

      const commonMeals = mealsArrays.reduce((acc, meals) => {
        const ids = meals.map((meal: FilteredMeal) => meal.idMeal);
        return acc.filter((meal: FilteredMeal) => ids.includes(meal.idMeal));
      });

      dispatch(setDishes(commonMeals));
      dispatch(setSearched(true));
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  }

  return (
    <>
      <Heading>Filter</Heading>
      <br />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {filterDataWithDefault.map((data, index) => {
            return (
              <FormField
                control={form.control}
                name={filterDataHeading[index]}
                key={index}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="w-[280px] h-[56px]  justify-between text-xl"
                            style={{ fontWeight: "normal" }}
                          >
                            {field.value
                              ? data.find((l) => l.value === field.value)?.label
                              : filterDataHeading[index]}
                            <ChevronsUpDown className="opacity-50 ml-2 h-4 w-4" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[280px] p-0">
                        <Command>
                          <CommandList>
                            <CommandGroup>
                              {data.map((d) => (
                                <CommandItem
                                  key={d.value}
                                  value={d.label}
                                  onSelect={() => {
                                    form.setValue(
                                      filterDataHeading[index],
                                      d.value
                                    );
                                  }}
                                >
                                  {d.label}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      d.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}

          <Button
            variant={"customOrange"}
            size={"customOrangeSize"}
            type="submit"
          >
            Apply filters
          </Button>
        </form>
      </Form>
    </>
  );
}

export default FilterSection;
