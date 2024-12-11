import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";

import { createHabit } from '../../utils/fakeApi';
import { HabitFormData, habitColors as colors, habitIcons as icons } from '../../utils/habitData';

export default function HabitForm() {
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<HabitFormData>({
    defaultValues: {
      goal: 1,
      icon: icons[0]?.name || "",
      color: colors[0] || "",
    },
  });

  const onSubmit = (data: HabitFormData) => {
    console.log('onSubmit: ', data);

    const result = createHabit({
      _id: uuidv4(),
      name: data.name,
      description: data.description,
      icon: data.icon,
      color: data.color,
      goal: data.goal,
      completedDates: [],
    });

    if (result.success) {
      console.log("Habit created successfully:", result.value);
    } else {
      console.error("Error creating habit:", result.error);
    }
  };

  const isFormValid = !errors.name && !errors.description && !errors.icon && !errors.color && !errors.goal;

  const handleGoalChange = (operation: 'increment' | 'decrement') => {
    const currentGoal = getValues('goal');
    let newGoal = operation === 'increment' ? currentGoal + 1 : currentGoal - 1;

    // Impedir que o goal seja menor que 1 ou maior que 36
    newGoal = Math.max(1, Math.min(36, newGoal));

    setValue('goal', newGoal, { shouldValidate: true });
  };

  const goal = getValues('goal');

  return (
    <ScrollArea className="h-[500px] pr-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className='text-zinc-300'>Name</Label>
          <Input
            id="name"
            {...register("name", { required: "Name is required" })}
            placeholder="Enter habit name"
          />
          {errors.name && (
            <p className="text-red-500">
              {typeof errors.name.message === "string" ? errors.name.message : "Invalid error message"}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className='text-zinc-300'>Description</Label>
          <Textarea
            id="description"
            {...register("description", { required: "Description is required" })}
            placeholder="Enter habit description"
          />
          {errors.description && (
            <p className="text-red-500">
              {typeof errors.description.message === "string" ? errors.description.message : "Invalid error message"}
            </p>
          )}
        </div>

        {/* Goal */}
        <div className="space-y-2">
          <label htmlFor="goal" className='text-zinc-300'>Daily Goal</label>
          <div className="flex items-center space-x-2">
            <Input
              id="goal"
              readOnly
              value={goal + ' / Day'}
              className="w-full border rounded text-zinc-300"
              {...register("goal", { required: "Goal is required" })}
            />
            <button
              type="button"
              className="px-3 py-1 border rounded disabled:opacity-50 text-zinc-300"
              onClick={() => handleGoalChange('decrement')}
              disabled={goal <= 1} // Botão desabilitado quando goal for 1
            >
              -
            </button>
            <button
              type="button"
              className="px-3 py-1 border rounded disabled:opacity-50 text-zinc-300"
              onClick={() => handleGoalChange('increment')}
              disabled={goal >= 36} // Botão desabilitado quando goal for 36
            >
              +
            </button>
          </div>
        </div>

        {/* Icon */}
        <div className="space-y-2">
          <Label className='text-zinc-300'>Select an icon</Label>
          <RadioGroup
            onValueChange={(value) => setValue('icon', value)}
            className="grid grid-cols-7 gap-2"
            {...register("icon", { required: "Icon is required" })}
          >
            {icons.map((icon) => (
              <div key={icon.name} className="flex justify-center items-center">
                <RadioGroupItem
                  value={icon.name}
                  id={`icon-${icon.name}`}
                  className="peer hidden"
                />
                <Label
                  htmlFor={`icon-${icon.name}`}
                  className="flex items-center justify-center text-zinc-300 rounded-md border-2 border-zinc-900 bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer"
                  style={{ width: "40px", height: "40px" }}
                >
                  <icon.component className="h-5 w-5" />
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Color */}
        <div className="space-y-2">
          <Label className='text-zinc-300'>Select a color</Label>
          <RadioGroup
            onValueChange={(value) => setValue('color', value)}
            className="grid grid-cols-7 gap-2"
            {...register("color", { required: "Color is required" })}
          >
            {colors.map((color) => (
              <div key={color} className="flex justify-center items-center">
                <RadioGroupItem
                  value={color}
                  id={`color-${color}`}
                  className="peer hidden"
                />
                <Label
                  htmlFor={`color-${color}`}
                  className="flex items-center justify-center rounded-md border-2 border-black bg-popover hover:border-primary peer-data-[state=checked]:border-primary cursor-pointer"
                  style={{ width: "40px", height: "40px" }}
                >
                  <div
                    className={`h-6 w-6 ${color} rounded-md m-1`}
                  />
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Button
          type="submit"
          className={`w-full ${isFormValid ? 'bg-green-600 hover:bg-green-500' : 'bg-gray-400 cursor-not-allowed'}`}
          disabled={!isFormValid}
        >
          Save Habit
        </Button>
      </form>
    </ScrollArea>
  );
}