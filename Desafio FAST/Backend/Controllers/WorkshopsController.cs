using Microsoft.AspNetCore.Mvc;
using ProjectName.Data;
using ProjectName.Models;
using System.Linq;

namespace ProjectName.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkshopsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public WorkshopsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Listar todos os workshops
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.Workshops.ToList());
        }

        // Buscar um workshop pelo ID
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var workshop = _context.Workshops.Find(id);
            if (workshop == null) return NotFound();
            return Ok(workshop);
        }

        // Criar um novo workshop
        [HttpPost]
        public IActionResult Create([FromBody] Workshop workshop)
        {
            if (workshop == null) return BadRequest();
            _context.Workshops.Add(workshop);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = workshop.Id }, workshop);
        }

        // Atualizar um workshop
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Workshop workshop)
        {
            var existingWorkshop = _context.Workshops.Find(id);
            if (existingWorkshop == null) return NotFound();

            existingWorkshop.Nome = workshop.Nome;
            existingWorkshop.DataRealizacao = workshop.DataRealizacao;
            existingWorkshop.Descricao = workshop.Descricao;
            _context.SaveChanges();

            return NoContent();
        }

        // Excluir um workshop
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var workshop = _context.Workshops.Find(id);
            if (workshop == null) return NotFound();

            _context.Workshops.Remove(workshop);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
