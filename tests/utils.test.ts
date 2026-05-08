import { describe, it, expect } from 'vitest';
import { formatItineraryToMarkdown, validateForm } from '../src/lib/utils';

describe('utils', () => {
  describe('formatItineraryToMarkdown', () => {
    it('returns empty string when plan is null', () => {
      expect(formatItineraryToMarkdown(null)).toBe('');
    });

    it('formats a complete plan to markdown correctly', () => {
      const mockPlan = {
        weather: 'Sunny and 25C',
        itinerary: [
          { day: 1, theme: 'Arrival', activities: ['Check in', 'Rest'] }
        ],
        food: ['Pizza'],
        tips: ['Use public transport'],
        packing: ['Sunscreen']
      };
      
      const markdown = formatItineraryToMarkdown(mockPlan);
      expect(markdown).toContain('## Weather\nSunny and 25C');
      expect(markdown).toContain('### Day 1: Arrival');
      expect(markdown).toContain('- Check in');
      expect(markdown).toContain('## Food Recommendations\n- Pizza');
      expect(markdown).toContain('## Local Tips\n- Use public transport');
      expect(markdown).toContain('## Packing Checklist\n- [ ] Sunscreen');
    });

    it('handles missing fields gracefully', () => {
      const mockPlan = {
        itinerary: [
          { day: 1, theme: 'Arrival', activities: ['Check in'] }
        ]
      };
      
      const markdown = formatItineraryToMarkdown(mockPlan);
      expect(markdown).toContain('### Day 1: Arrival');
      expect(markdown).not.toContain('## Weather');
      expect(markdown).not.toContain('## Food Recommendations');
    });
  });

  describe('validateForm', () => {
    it('returns null for valid input', () => {
      expect(validateForm('Paris', 'Moderate', '5', 'Adventure')).toBeNull();
    });

    it('returns error for empty destination', () => {
      expect(validateForm('  ', 'Moderate', '5', 'Adventure')).toBe('Destination is required');
    });

    it('returns error for invalid duration', () => {
      expect(validateForm('Paris', 'Moderate', '0', 'Adventure')).toBe('Duration must be between 1 and 30 days');
      expect(validateForm('Paris', 'Moderate', '31', 'Adventure')).toBe('Duration must be between 1 and 30 days');
      expect(validateForm('Paris', 'Moderate', 'abc', 'Adventure')).toBe('Duration must be between 1 and 30 days');
    });

    it('returns error for missing fields', () => {
      expect(validateForm('Paris', '', '5', 'Adventure')).toBe('Budget is required');
      expect(validateForm('Paris', 'Moderate', '5', '')).toBe('Style is required');
    });
  });
});
