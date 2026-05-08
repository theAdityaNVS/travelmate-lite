import { TravelPlan } from './gemini';

export function formatItineraryToMarkdown(plan: TravelPlan | null): string {
  if (!plan) return '';
  
  let markdown = `# Travel Itinerary\n\n`;
  
  if (plan.weather) {
    markdown += `## Weather\n${plan.weather}\n\n`;
  }
  
  if (plan.itinerary && plan.itinerary.length > 0) {
    markdown += `## Itinerary\n\n`;
    plan.itinerary.forEach((day) => {
      markdown += `### Day ${day.day}: ${day.theme}\n`;
      day.activities.forEach((activity: string) => {
        markdown += `- ${activity}\n`;
      });
      markdown += `\n`;
    });
  }

  if (plan.food && plan.food.length > 0) {
    markdown += `## Food Recommendations\n`;
    plan.food.forEach((item: string) => {
      markdown += `- ${item}\n`;
    });
    markdown += `\n`;
  }

  if (plan.tips && plan.tips.length > 0) {
    markdown += `## Local Tips\n`;
    plan.tips.forEach((tip: string) => {
      markdown += `- ${tip}\n`;
    });
    markdown += `\n`;
  }

  if (plan.packing && plan.packing.length > 0) {
    markdown += `## Packing Checklist\n`;
    plan.packing.forEach((item: string) => {
      markdown += `- [ ] ${item}\n`;
    });
    markdown += `\n`;
  }

  return markdown;
}

export function validateForm(destination: string, budget: string, duration: string, style: string) {
  if (!destination.trim()) return "Destination is required";
  if (!budget) return "Budget is required";
  if (!duration) return "Duration is required";
  if (!style) return "Style is required";
  if (isNaN(Number(duration)) || Number(duration) <= 0 || Number(duration) > 30) return "Duration must be between 1 and 30 days";
  return null;
}
