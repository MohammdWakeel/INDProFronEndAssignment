let page = 1;
let perPage = 5;

$(document).ready(function() {
    $('#fetch-button').on('click', function() {
        const username = $('#username').val();
        if (username) {
            fetchRepositories(username);
        } else {
            alert('Please enter a GitHub username');
        }
    });

    $('#load-more').on('click', function() {
        const username = $('#username').val();
        if (username) {
            fetchRepositories(username, page + 1);
        }
    });
});

function fetchRepositories(username, newPage = 1) {
    $.ajax({
        url: `https://api.github.com/users/${username}/repos`,
        data: {
            per_page: perPage,
            page: newPage
        },
        success: function(data) {
            if (data.length === 0 && newPage > 1) {
                $('#load-more').hide();
                return;
            }

            if (newPage === 1) {
                $('#repo-list').empty(); 
            }

            $.each(data, function(index, repo) {
                const repoItem = `
                    <div class="repo">
                        <h3>${repo.name}</h3>
                        <p>${repo.description || 'No description'}</p>
                        <a href="${repo.html_url}" target="_blank">View Repository</a>
                    </div>
                `;
                $('#repo-list').append(repoItem);
            });

            page = newPage; 
            $('#load-more').toggle(data.length === perPage);
        },
        error: function(error) {
            console.error('Error fetching repositories:', error);
        }
    });
}
