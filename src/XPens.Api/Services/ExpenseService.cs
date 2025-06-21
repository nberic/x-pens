using System.Collections.Generic;
using System.Threading.Tasks;
using XPens.Api.DTOs;
using XPens.Api.Data;
using XPens.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace XPens.Api.Services
{
    public class ExpenseService : IExpenseService
    {
        private readonly ExpenseTrackerDbContext _context;
        public ExpenseService(ExpenseTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ExpenseDto>> GetAllExpensesAsync()
        {
            return await _context.Expenses.Select(e => new ExpenseDto(
                e.Id,
                e.Amount,
                e.Date,
                e.CategoryId,
                e.Note
            )).ToListAsync();
        }

        public async Task<ExpenseDto?> GetExpenseByIdAsync(int id)
        {
            var e = await _context.Expenses.FindAsync(id);
            if (e == null) return null;
            return new ExpenseDto(
                e.Id,
                e.Amount,
                e.Date,
                e.CategoryId,
                e.Note
            );
        }

        public async Task<ExpenseDto> CreateExpenseAsync(ExpenseDto expenseDto)
        {
            var expense = new Expense
            {
                Amount = expenseDto.Amount,
                Date = expenseDto.Date,
                CategoryId = expenseDto.CategoryId,
                Note = expenseDto.Note
            };
            _context.Expenses.Add(expense);
            await _context.SaveChangesAsync();
            return new ExpenseDto(
                expense.Id,
                expense.Amount,
                expense.Date,
                expense.CategoryId,
                expense.Note
            );
        }

        public async Task<ExpenseDto?> UpdateExpenseAsync(int id, ExpenseDto expenseDto)
        {
            var expense = await _context.Expenses.FindAsync(id);
            if (expense == null) return null;
            expense.Amount = expenseDto.Amount;
            expense.Date = expenseDto.Date;
            expense.CategoryId = expenseDto.CategoryId;
            expense.Note = expenseDto.Note;
            await _context.SaveChangesAsync();
            return new ExpenseDto(
                expense.Id,
                expense.Amount,
                expense.Date,
                expense.CategoryId,
                expense.Note
            );
        }

        public async Task<bool> DeleteExpenseAsync(int id)
        {
            var expense = await _context.Expenses.FindAsync(id);
            if (expense == null) return false;
            _context.Expenses.Remove(expense);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync()
        {
            return await _context.Categories.Select(c => new CategoryDto(
                c.Id,
                c.Name,
                c.Color
            )).ToListAsync();
        }

        public async Task<CategoryDto> CreateCategoryAsync(CategoryDto categoryDto)
        {
            var category = new Category
            {
                Name = categoryDto.Name,
                Color = categoryDto.Color
            };
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            return new CategoryDto(
                category.Id,
                category.Name,
                category.Color
            );
        }

        public async Task<CategoryDto?> UpdateCategoryAsync(int id, CategoryDto categoryDto)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null) return null;
            category.Name = categoryDto.Name;
            category.Color = categoryDto.Color;
            await _context.SaveChangesAsync();
            return new CategoryDto(
                category.Id,
                category.Name,
                category.Color
            );
        }

        public async Task<bool> DeleteCategoryAsync(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null) return false;
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
