using System.Collections.Generic;
using System.Threading.Tasks;
using XPens.Api.DTOs;

namespace XPens.Api.Services
{
    public interface IExpenseService
    {
        Task<IEnumerable<ExpenseDto>> GetAllExpensesAsync();
        Task<ExpenseDto?> GetExpenseByIdAsync(int id);
        Task<ExpenseDto> CreateExpenseAsync(ExpenseDto expenseDto);
        Task<ExpenseDto?> UpdateExpenseAsync(int id, ExpenseDto expenseDto);
        Task<bool> DeleteExpenseAsync(int id);

        Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync();
        Task<CategoryDto> CreateCategoryAsync(CategoryDto categoryDto);
        Task<CategoryDto?> UpdateCategoryAsync(int id, CategoryDto categoryDto);
        Task<bool> DeleteCategoryAsync(int id);
    }
}
