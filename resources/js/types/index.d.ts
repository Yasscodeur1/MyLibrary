import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';
import type { Route } from 'ziggy-js';
import type { Route as ZiggyRoute } from 'ziggy-js';

export interface Book {
    summary: string;
    id: number;
    title: string;
    description: string | null;
    publication_date: string | null;
    author: Author;
    category: Category;
    created_at: string;
    updated_at: string;
}

export interface Author {
    id: number;
    name: string;
    biography: string | null;
    birth_date: string | null;
    created_at: string;
    updated_at: string;
}

export interface Category {
    id: number;
    name: string;
    description: string | null;
    created_at: string;
    updated_at: string;
}