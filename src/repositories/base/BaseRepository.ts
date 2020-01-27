import { IWrite} from "../interfaces/IWrite";
import { IRead} from "../interfaces/IRead";
import {Document, model} from 'mongoose';


export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {

    public readonly _model: Document;

    constructor(m_model) {
        if (typeof m_model === 'string')
            this._model = model(m_model);
        else
            this._model = m_model;
    }

    async create(item: T) {
        const result = await this._model.save();
        return result;
    }

    delete(id: string): Promise<boolean> {
        return undefined;
    }

    find(item: T): Promise<T[]> {
        return undefined;
    }

    findOne(id: string): Promise<T> {
        return undefined;
    }

    update(id: string, item: T): Promise<boolean> {
        return undefined;
    }

}
