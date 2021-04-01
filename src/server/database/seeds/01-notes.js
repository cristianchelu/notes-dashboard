exports.seed = function(knex) {
    return knex("notes")
        .del()
        .then(function() {
            return knex("notes").insert([
                { 
                    text: "#Shopping list\n\n[ ] Carrots", 
                    createdAt: knex.fn.now(),
                    x: 40,
                    y: 40,
                },
                { 
                    text: "😺 Pet the kitten", 
                    createdAt: knex.fn.now(),
                    x: 50,
                    y: 50,
                },
            ]);
        });
};