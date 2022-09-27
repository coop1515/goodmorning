import React from 'react';
import { Button } from 'react-bootstrap';
function Pagination({ total, limit, page, setPage }) {
    const numPages = Math.ceil(total / limit);

    return (
        <div>
            <Button variant="outline-dark" onClick={() => setPage(page - 1)} disabled={page === 1}>
                &lt;
            </Button>
            {Array(numPages)
                .fill()
                .map((_, i) => (
                <Button variant="outline-dark"
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    aria-current={page === i + 1 ? "page" : null}
                    >
                    {i + 1}
                </Button>
            ))}
            <Button variant="outline-dark" onClick={() => setPage(page + 1)} disabled={page === numPages}>
                &gt;
            </Button>
        </div>
    );
}

export default Pagination;