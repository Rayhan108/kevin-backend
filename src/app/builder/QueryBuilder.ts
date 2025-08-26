import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // Search functionality for multiple fields
  search(searchableFields: string[]) {
    const search = this?.query?.search as string;
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: search, $options: 'i' },  // case-insensitive search
        })),
      });
    }
    return this;
  }

  // Apply filters, excluding fields that shouldn't be part of the query
  filter() {
    const queryObj = { ...this.query }; // Clone the query object

    const excludeFields = ['search', 'sort', 'limit', 'page', 'fields']; // fields to exclude from filter query
    excludeFields.forEach((el) => delete queryObj[el]);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  // Sorting functionality
  sort() {
    const sort = (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt'; // Default to descending by createdAt
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }

  // Pagination functionality
  paginate() {
    const page = Number(this.query?.page) || 1;
    const limit = Number(this.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  // Fields selection (allow dynamic field inclusion/exclusion)
  fields() {
    const fields = (this.query?.fields as string)?.split(',')?.join(' ') || '-__v'; // Default to excluding __v field
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  // Count total records for pagination metadata
  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default QueryBuilder;
